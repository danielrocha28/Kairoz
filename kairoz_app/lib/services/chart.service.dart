import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

  Future<http.Response> ChartPie() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.get(
        Uri.parse('$baseUrl/chart-pie'),);

        if (response.statusCode == 200) {
        // Retorna o conteúdo do backend
        return response.body
      } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro: ${response.statusCode}';
      }
        
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao entrar. Tente novamente!"}',
        400,
      );
    }
  }

   Future<http.Response> ChartWeek() async {
    final baseUrl = dotenv.env['BASE_URL'];
    
    try {
      return await http.get(
        Uri.parse('$baseUrl/chart-week'),);

        if (response.statusCode == 200) {
        // Retorna o conteúdo do backend
        return response.body
      } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro: ${response.statusCode}';
      }
        
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao entrar. Tente novamente!"}',
        400,
      );
    }
  }

