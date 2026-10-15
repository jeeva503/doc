import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import { imageUrl } from '../api';

// Current user's profile: big round photo, "N Connects" pill, name, occupation.
export default function ProfileCard({ user }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarRing}>
        <Image source={{ uri: imageUrl(user.profileImage) }} style={styles.avatar} />
      </View>

      <View style={styles.pill}>
        <Ionicons name="link" size={16} color={colors.tealDark} />
        <Text style={styles.pillText}>{user.connections} Connects</Text>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.occupation}>{user.occupation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 28,
    backgroundColor: colors.background,
  },
  avatarRing: {
    width: 146,
    height: 146,
    borderRadius: 73,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BFC7D5',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: { width: 146, height: 146, borderRadius: 73 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.tealBorder,
    backgroundColor: colors.tealLight,
  },
  pillText: { fontFamily: fonts.regular, fontSize: 14, color: colors.textMuted },
  name: { fontFamily: fonts.bold, fontSize: 20, color: colors.text, marginTop: 14 },
  occupation: { fontFamily: fonts.regular, fontSize: 16, color: colors.textMuted, marginTop: 4 },
});
