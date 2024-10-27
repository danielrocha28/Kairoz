import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class deleteCard {
        final int id_cards;

    const deleteCard({
        required this.id_cards;
    });

Future<http.Response> () async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.delete(
        Uri.parse('$baseUrl/tasks/$id_cards'),);
        
    if (response.statusCode == 200) {
      return 'Carta deletada com sucesso', 200;
    } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao deletar a carta: ${response.statusCode}';
    }
    
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao deletar a carta, tente novamente!"}',
        400,
      );
    }
  }
  }
