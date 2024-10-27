import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class DeckService {
  final String name;
  final String description;
  
  const DeckService ({
    required this.name,
  })

  Future<http.Response> newDeck() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.post(
        Uri.parse('$baseUrl/decks'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
            "name": name,
            "description": description
            }),);

      if (response.statusCode == 200) {
        return response.body;
      } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao criar o deck ${response.statusCode}';
      }
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao criar o deck. Tente novamente!"}',
        400,
      );
    }
  }
}
