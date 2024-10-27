import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class DeckService {
  final int id_decks;
  
  const DeckService ({
    required this.id_decks,
  })

  Future<http.Response> deleteDeck() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.delete(
        Uri.parse('$baseUrl/decks/$id_decks'),);

        if (response.statusCode == 200) {
        // Retorna o conteúdo do backend
        return 'Deck deletado com sucesso';
      } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao deletar o deck: ${response.statusCode}';
      }
        
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro. Tente novamente!"}',
        400,
      );
    }
  }
}