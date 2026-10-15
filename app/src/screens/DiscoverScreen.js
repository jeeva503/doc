import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { fetchUsers, sendConnectRequest } from '../api';
import { colors } from '../theme';
import UserRow from '../components/UserRow';
import { LoadingView, ErrorView } from '../components/StateViews';

export default function DiscoverScreen() {
  const [users, setUsers] = useState([]);
  const [requestedIds, setRequestedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data.users);
      // Comes from the server, so "Requested" survives closing the app.
      setRequestedIds(data.requestedIds);
    } catch (e) {
      setError('Could not load people. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleConnect = async (userId) => {
    // Show "Requested" right away, undo it if the request fails.
    setRequestedIds((ids) => [...ids, userId]);
    try {
      await sendConnectRequest(userId);
    } catch (e) {
      setRequestedIds((ids) => ids.filter((id) => id !== userId));
    }
  };

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <FlatList
      data={users}
      keyExtractor={(user) => user._id}
      renderItem={({ item }) => (
        <UserRow user={item} requested={requestedIds.includes(item._id)} onConnect={handleConnect} />
      )}
      showsVerticalScrollIndicator={false}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.white },
});
