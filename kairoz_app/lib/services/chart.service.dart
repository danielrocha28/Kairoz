import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

Future<void> chartPie() async {
  final baseUrl = dotenv.env['BASE_URL'];

  try {
    final response = await http.get(Uri.parse('$baseUrl/chart-pie'));

    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);
      return data;
    } else {
      throw Exception(
          'Erro ao carregar o gráfico de pizza: ${response.statusCode}');
    }
  } catch (e) {
    throw Exception(
        'Ocorreu um erro ao tentar carregar o gráfico de pizza. Tente novamente!');
  }
}

Future<void> chartWeek() async {
  final baseUrl = dotenv.env['BASE_URL'];

  try {
    final response = await http.get(Uri.parse('$baseUrl/chart-week'));

    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);
      return data;
    } else {
      throw Exception(
          'Erro ao carregar o gráfico semanal: ${response.statusCode}');
    }
  } catch (e) {
    throw Exception(
        'Ocorreu um erro ao tentar carregar o gráfico semanal. Tente novamente!');
  }
}
