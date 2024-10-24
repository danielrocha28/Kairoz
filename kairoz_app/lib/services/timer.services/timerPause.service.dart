import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

  // Função para fazer a requisição e pegar o corpo da resposta
  Future<String> pause() async {
    final baseUrl = dotenv.env['BASE_URL']; // Carrega a URL do backend

    try {
      // Faz a requisição POST para o backend
      final response = await http.put(
        Uri.parse('$baseUrl/timer/pause'),)
        
      // Verifica se a requisição foi bem-sucedida (status 201)
      if (response.statusCode == 200) {
        // Retorna o conteúdo do backend
        return response.body;
      } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao pausar o timer: ${response.statusCode}';
      }
    } catch (error) {
      // Tratamento de erros de conexão
      return 'Ocorreu um erro ao pausar o timer. Tente novamente!';
    }
  }
}