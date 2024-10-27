import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

  Future<http.Response> getAlarmsAll() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.get(
        Uri.parse('$baseUrl/alarms'),);

        if (response.statusCode == 200) {
        // Retorna o conteúdo do backend
        return response.body
      } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro: ${response.statusCode}';
      }
        
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao encontrar o alarme. Tente novamente!"}',
        400,
      );
    }
  }