import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class SleepLogService {
  final String sleepTime;
  final String wakeUpTime;
  final baseUrl = dotenv.env['BASE_URL'];

  SleepLogService({
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

      if (response.statusCode != 201) {
        throw Exception(
          'Ocorreu um erro ao cadastrar registro: ${response.statusCode}',
        );
      }

      final getResponse = await http.get(
        Uri.parse('$baseUrl/sleep-time'),
      );

      if (getResponse.statusCode != 200) {
        throw Exception(
          'Ocorreu um erro ao buscar registro: ${response.statusCode}',
        );
      }

      return getResponse;
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao Cadastrar-se. Tente novamente!"}',
        400,
      );
    }
  }
}
