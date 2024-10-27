import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class CardService {
  final String front;
  final String verse;
  final int id_decks;
  
  const CardService ({
    required this.id_decks,
  })

  Future<http.Response> newCard() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.post(
        Uri.parse('$baseUrl/cards/$id_decks'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
            "front": front,
            "verse": verse
            }),);

      if (response.statusCode == 200) {
        return response.body;
      } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao criar o carta ${response.statusCode}';
      }
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao criar a carta. Tente novamente!"}',
        400,
      );
    }
  }
}
