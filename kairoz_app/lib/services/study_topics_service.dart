import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class StudyTopicsService {
  final String baseUrl = dotenv.env['BASE_URL'] ?? '';
  String? timeAdded;
  String? topicTitle;
  String? topicID;
  String? weekDay;

  StudyTopicsService(
      {this.timeAdded, this.topicTitle, this.topicID, this.weekDay});

  Future<List<Map<String, String>>> getTopicList() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/study-topic'),
      );

      if (response.statusCode == 200) {
        print(response.body);
        print(response.statusCode);
        final List<dynamic> data = jsonDecode(response.body);
        final topics = data.map<Map<String, String>>((topic) {
          return {
            'title': topic['title'] ?? '',
            'totalTime': topic['totalTime'] ?? '00:00:00',
          };
        }).toList();

        return topics;
      } else {
        print('Erro ao puxar a lista de tópicos: ${response.statusCode}');
        return [];
      }
    } catch (error) {
      print('Erro ao puxar a lista de tópicos: $error');
      return [];
    }
  }

  Future<String> createNewTopic(String topicTitle) async {
    try {
      final postResponse = await http.post(
        Uri.parse('$baseUrl/tasks'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: jsonEncode({
          "title": topicTitle,
          "tag": "study topic",
          "category": "study",
        }),
      );
      print(postResponse.statusCode);
      print(postResponse.body);
      return postResponse.toString();
    } catch (error) {
      return '{"$error": "Ocorreu um erro ao criar o tópico de estudo. Tente novamente!"}';
    }
  }

  Future<http.Response> addTimeToTopic(
      String topicTitle, String timeAdded, String weekDay) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/tasks'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: jsonEncode({
          "title": topicTitle,
          "timeAdded": timeAdded,
          "weekDay": weekDay,
        }),
      );
      return response;
    } catch (e) {
      throw Exception('Erro ao adicionar tempo ao tópico: $e');
    }
  }
}
