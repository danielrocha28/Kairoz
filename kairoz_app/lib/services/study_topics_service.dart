import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class StudyTopicsService {
  final String baseUrl = dotenv.env['BASE_URL'] ?? '';
  String? savedTime;
  String? topicTitle;
  String? topicID;
  String? weekDay;

  StudyTopicsService(
      {this.savedTime, this.topicTitle, this.topicID, this.weekDay});

  Future<String> getTopicList() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/study-topic-list'),
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
