import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class AlarmService {
  final String alarm_time;
  final String alarm_day;
  final String message;
  final bool? executed;
  final int id_alarm;

  const AlarmService({
    required this.alarm_time,
    required this.id_alarm,
  });

  Future<http.Response> updateAlarm() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.put(
        Uri.parse('$baseUrl/alarms/$id_alarm'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
            "alarm_time": alarm_time,
            "alarm_day": alarm_day,
            "message": message,
            "executed": executed
            }),);

      if (response.statusCode == 200) {
        return response.body;
      } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao atualizar o alarme ${response.statusCode}';
      }
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao atualizar o alarme. Tente novamente!"}',
        400,
      );
    }
  }
}
