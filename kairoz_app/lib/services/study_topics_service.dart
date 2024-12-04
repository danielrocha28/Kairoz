import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class StudyTopicsService {
  final String baseUrl = dotenv.env['BASE_URL'] ?? '';
  String? savedTime;
  String? topicTitle;
  String? topicID;

  StudyTopicsService({this.savedTime, this.topicTitle, this.topicID});

  Future<String> getTopicList() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/timer/study-topic-list'),
        headers: {"Content-Type": "application/json"},
      );

      if (response.statusCode == 200) {
        print(response.body);
        return response.body;
      } else {
        print(response.body);
        print(response.statusCode);
        return 'Erro ao puxar a lista de tópicos: ${response.statusCode}';
      }
    } catch (error) {
      print(error);
      print(error);
      return 'Erro ao puxar a lista de tópicos: $error';
    }
  }
}
