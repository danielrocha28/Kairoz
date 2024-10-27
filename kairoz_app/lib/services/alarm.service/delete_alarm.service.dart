import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

Future<http.Response> deleteAlarm() async {
    final baseUrl = dotenv.env['BASE_URL'];

    class AlarmService {
        final int id_alarm;

    const AlarmService({
        required this.id_alarm;
    });

    try {
      return await http.delete(
        Uri.parse('$baseUrl/alarms/$id_alarm'),);
        
    if (response.statusCode == 200) {
      return 'Alarme deletado com sucesso', 200;
    } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao deletar o alarme: ${response.statusCode}';
    }
    
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao deletar o alarme, tente novamente!"}',
        400,
      );
    }
  }
  }
