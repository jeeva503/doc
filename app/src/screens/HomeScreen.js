import { useCallback, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { fetchPosts, fetchUsers } from '../api';
import { colors } from '../theme';
import ProfileCard from '../components/ProfileCard';
import PostCard from '../components/PostCard';
import { LoadingView, ErrorView } from '../components/StateViews';

export default function HomeScreen() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Profile comes from /users, the feed from /posts
      const [usersData, postsData] = await Promise.all([fetchUsers(), fetchPosts()]);
      setCurrentUser(usersData.currentUser);
      setPosts(postsData.posts);
    } catch (e) {
      setError('Could not load your feed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post._id}
      ListHeaderComponent={<ProfileCard user={currentUser} />}
      renderItem={({ item }) => <PostCard post={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  separator: { height: 8, backgroundColor: colors.background },
});
