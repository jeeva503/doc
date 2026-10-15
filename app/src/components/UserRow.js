import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import { imageUrl } from '../api';

// One person in the Discover list with a Connect / Requested button.
export default function UserRow({ user, requested, onConnect }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: imageUrl(user.profileImage) }} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
        <Text style={styles.occupation} numberOfLines={1}>{user.occupation}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, requested && styles.buttonRequested]}
        disabled={requested}
        activeOpacity={0.8}
        onPress={() => onConnect(user._id)}
      >
        <Text style={[styles.buttonText, requested && styles.buttonTextRequested]}>
          {requested ? 'Requested' : 'Connect'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#112547' },
  info: { flex: 1, marginLeft: 12, marginRight: 12 },
  name: { fontFamily: fonts.medium, fontSize: 17, color: colors.text },
  occupation: { fontFamily: fonts.regular, fontSize: 14, color: colors.textMuted, marginTop: 2 },
  button: {
    minWidth: 104,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.teal,
    borderWidth: 1,
    borderColor: colors.teal,
  },
  buttonRequested: { backgroundColor: colors.tealLight, borderColor: colors.tealBorder },
  buttonText: { fontFamily: fonts.medium, fontSize: 14, color: colors.white },
  buttonTextRequested: { color: colors.tealDark },
});
