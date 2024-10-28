import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

// Função para fazer a requisição e pegar o corpo da resposta
Future<String> execute() async {
  final baseUrl = dotenv.env['BASE_URL']; // Carrega a URL do backend

  try {
    // Faz a requisição DELETE para o backend
    final response = await http.delete(
      Uri.parse('$baseUrl/timer/delete'),
    );

    // Verifica se a requisição foi bem-sucedida (status 200)
    if (response.statusCode == 200) {
      // Retorna uma mensagem de sucesso
      return 'Timer foi deletado com sucesso';
    } else {
      // Em caso de erro, retorna a mensagem de erro com o código de status
      return 'Erro ao deletar o timer: ${response.statusCode}';
    }
  } catch (error) {
    // Tratamento de erros de conexão
    return 'Ocorreu um erro ao deletar o timer. Tente novamente!';
  }
}
