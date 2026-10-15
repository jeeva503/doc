import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import { imageUrl } from '../api';

// One feed item: author row, text, full-width image.
export default function PostCard({ post }) {
  const { author } = post;
  return (
    <View style={styles.container}>
      <View style={styles.authorRow}>
        <Image source={{ uri: imageUrl(author.profileImage) }} style={styles.authorImage} />
        <View style={styles.authorText}>
          <Text style={styles.authorName}>{author.name}</Text>
          <Text style={styles.authorOccupation}>{author.occupation}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.image ? (
        <Image source={{ uri: imageUrl(post.image) }} style={styles.postImage} resizeMode="cover" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, paddingTop: 16 },
  authorRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  authorImage: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#112547' },
  authorText: { marginLeft: 12 },
  authorName: { fontFamily: fonts.medium, fontSize: 17, color: colors.text },
  authorOccupation: { fontFamily: fonts.regular, fontSize: 14, color: colors.textMuted, marginTop: 1 },
  content: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  postImage: { width: '100%', aspectRatio: 1, backgroundColor: colors.background },
});
