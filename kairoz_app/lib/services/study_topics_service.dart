import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class StudyTopicsService {
  final String baseUrl = dotenv.env['BASE_URL'] ?? '';
  String? timeAdded;
  String? topicTitle;
  String? topicID;

  StudyTopicsService({
    this.timeAdded,
    this.topicTitle,
    this.topicID,
  });

  Future<List<Map<String, String>>> getTopicList() async {
    final baseUrl = dotenv.env['BASE_URL'];
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('token');

    try {
      final response = await http.get(
        Uri.parse('$baseUrl/study-topic'),
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        print(response.body);
        print(response.statusCode);
        final List<dynamic> data = jsonDecode(response.body);
        final topics = data.map<Map<String, String>>((topic) {
          return {
            'title': topic['title'] ?? '',
            'total_time': topic['total_time'] ?? '00:00:00',
            'tag': "study-topic",
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

  Future<http.Response> createNewTopic(String topicTitle) async {
    final baseUrl = dotenv.env['BASE_URL'];
    final mockedMode = dotenv.env['MOCKED_MODE'];
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('token');

    if (mockedMode == 'true') {
      return http.Response('Tópico Criado com Sucesso', 201);
    }

    try {
      final postResponse = await http.post(
        Uri.parse('$baseUrl/tasks'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(
            {"title": topicTitle, "category": "study", "tag": "study topic"}),
      );
      print('Resposta ao criar o tópico $postResponse');
      return postResponse;
    } catch (error) {
      print(http.Response);
      return http.Response(
        '{"$error": "Ocorreu um erro ao criar o tópico de estudo. Tente novamente!"}',
        400,
      );
    }
  }

  Future<http.Response> addTimeToTopic() async {
    final baseUrl = dotenv.env['BASE_URL'];
    final mockedMode = dotenv.env['MOCKED_MODE'];
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('token');

    if (mockedMode == 'true') {
      return http.Response('Tempo adicionado com sucesso', 201);
    }

    try {
      final response = await http.put(
        Uri.parse('$baseUrl/timer/save'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          "title": "sees",
          "totalTime": "00:07:09",
          "tag": "study-topic",
          "category": "study"
        }),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return response;
      } else {
        throw Exception(
            'Erro ao adicionar tempo ao tópico: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Erro ao adicionar tempo ao tópico: $e');
    }
  }
}
