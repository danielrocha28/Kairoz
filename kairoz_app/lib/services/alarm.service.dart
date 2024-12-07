import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class AlarmService {
  final String alarmTime;
  final String alarmDay;
  final String message;
  final bool? executed;
  final int alarmId;

  const AlarmService({
    required this.alarmTime,
    required this.alarmId,
    required this.alarmDay,
    required this.message,
    this.executed,
  });

  Future<Map<String, dynamic>> createAlarm() async {
    final baseUrl = dotenv.env['BASE_URL'];
    if (baseUrl == null) {
      return {
        'message': 'A URL base não foi configurada',
        'statusCode': 400,
      };
    }

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/alarms'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "alarm_time": alarmTime,
          "alarm_day": alarmDay,
          "message": message,
          "executed": executed,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return {
          'message': 'Erro ao criar o alarme: ${response.statusCode}',
          'statusCode': response.statusCode,
        };
      }
    } catch (e) {
      return {
        'message': 'Ocorreu um erro ao criar o alarme. Tente novamente!',
        'statusCode': 400,
      };
    }
  }

  Future<Map<String, dynamic>> deleteAlarm() async {
    final baseUrl = dotenv.env['BASE_URL'];
    if (baseUrl == null) {
      return {
        'message': 'A URL base não foi configurada',
        'statusCode': 400,
      };
    }

    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/alarms/$alarmId'),
      );

      if (response.statusCode == 200) {
        return {
          'message': 'Alarme deletado com sucesso',
          'statusCode': 200,
        };
      } else {
        return {
          'message': 'Erro ao deletar o alarme: ${response.statusCode}',
          'statusCode': response.statusCode,
        };
      }
    } catch (e) {
      return {
        'message': 'Ocorreu um erro ao deletar o alarme, tente novamente!',
        'statusCode': 400,
      };
    }
  }

  Future<Map<String, dynamic>> getAlarms() async {
    final baseUrl = dotenv.env['BASE_URL'];
    if (baseUrl == null) {
      return {
        'message': 'A URL base não foi configurada',
        'statusCode': 400,
      };
    }

    try {
      final response = await http.get(
        Uri.parse('$baseUrl/alarms'),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return {
          'message': 'Erro: ${response.statusCode}',
          'statusCode': response.statusCode,
        };
      }
    } catch (e) {
      return {
        'message': 'Ocorreu um erro ao encontrar os alarmes. Tente novamente!',
        'statusCode': 400,
      };
    }
  }

  Future<Map<String, dynamic>> updateAlarm() async {
    final baseUrl = dotenv.env['BASE_URL'];
    if (baseUrl == null) {
      return {
        'message': 'A URL base não foi configurada',
        'statusCode': 400,
      };
    }

    try {
      final response = await http.put(
        Uri.parse('$baseUrl/alarms/$alarmId'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "alarm_time": alarmTime,
          "alarm_day": alarmDay,
          "message": message,
          "executed": executed,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return {
          'message': 'Erro ao atualizar o alarme: ${response.statusCode}',
          'statusCode': response.statusCode,
        };
      }
    } catch (e) {
      return {
        'message': 'Ocorreu um erro ao atualizar o alarme. Tente novamente!',
        'statusCode': 400,
      };
    }
  }
}
