import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class TimerStartedService {
  final String id_task;
  final String title;

  const TimerStartedService({
    required this.id_task,
    required this.title,
  });

  // Função para fazer a requisição e pegar o corpo da resposta
  Future<String> start() async {
    final baseUrl = dotenv.env['BASE_URL']; // Carrega a URL do backend

    try {
      // Faz a requisição POST para o backend
      final response = await http.post(
        Uri.parse('$baseUrl/timer/start'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "id_task": id_task,
          "title": title,
        }),
      );

      // Verifica se a requisição foi bem-sucedida (status 201)
      if (response.statusCode == 201) {
        // Retorna o conteúdo do backend
        return response.body;
      } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao iniciar o timer: ${response.statusCode}';
      }
    } catch (error) {
      // Tratamento de erros de conexão
      return 'Ocorreu um erro ao iniciar o temporizador. Tente novamente!';
    }
  }
}
