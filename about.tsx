import { View, Text, StyleSheet, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function AboutScreen () {

  const classroomLink = 'https://classroom.google.com/c/Njg4OTY2MjA1NDUz';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>

      <Text style={styles.description}>
        Este é o nosso Aplicativo para a P2 da matéria de Tópicos em Engenharia de Software, ministrada pelo professor Matheus Romano
      </Text>

      <Text style={styles.description}>
        O projeto foi desenvolvido como parte de um estudo sobre integração com
        serviços externos via API REST.
      </Text>

      <Text style={styles.qrLabel}>Acesse o conteúdo completo:</Text>
      <View style={styles.qrContainer}>
        <QRCode value={classroomLink} size={200} />
      </View>

      <Text style={styles.footer}>Link da sala do Google Classroom</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#1DB954',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#1DB954',
    marginBottom: 15,
    textAlign: 'center',
  },
  qrLabel: {
    fontSize: 18,
    color: '#1DB954',
    marginTop: 30,
    marginBottom: 10,
  },
  qrContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  footer: {
    fontSize: 14,
    color: '#1DB954',
    marginTop: 20,
  },
});
