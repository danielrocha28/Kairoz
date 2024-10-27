import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class getDeckId {
        final int id_decks;

    const getDeckId({
        required this.id_decks;
    });

  Future<http.Response> getDeck() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.get(
        Uri.parse('$baseUrl/decks/$id_decks'),);
        
    if (response.statusCode == 200) {
      return response.body;
    } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao encontrar o deck ${response.statusCode}';
    }
    
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao encontrar o deck, tente novamente!"}',
        400,
      );
    }
  }
}