import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class RegisterService {
  final String sleepTime;
  final String wakeUpTime;
  final baseUrl = dotenv.env['BASE_URL'];

  const RegisterService({
    required this.sleepTime,
    required this.wakeUpTime,
  });

  Future<http.Response> newSleepLog() async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/sleep-time'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "sleep_time": sleepTime,
          "wake_up_time": wakeUpTime,
        }),
      );

      final getResponse = await http.get(
        Uri.parse('$baseUrl/sleep-time'),
      );
    
      if (response.statusCode == 201) {
        
        if (getResponse.statusCode == 200) {
            return response.body;
        } else {
            return 'Erro ao encontrar o registro de sono ${getResponse.statusCode}'; 
        }

      } else {
        return 'Erro ao registrar o sono: ${response.statusCode}';
      }
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao Cadastrar-se. Tente novamente!"}',
        400,
      );
    }
  }
}