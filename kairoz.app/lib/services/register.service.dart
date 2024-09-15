import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class RegisterService {
  final String name;
  final String email;
  final String password;

  const RegisterService({
    required this.name,
    required this.email,
    required this.password,
  });

  Future<http.Response> execute() async {
    final baseUrl = dotenv.env['BASE_URL'];
    final mockedMode = dotenv.env['MOCKED_MODE'];

    if (mockedMode == 'true') {
      return http.Response('Usuário Cadastrado', 201);
    }

    try {
      return await http.post(
        Uri.parse('$baseUrl/register'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "name": name,
          "email": email,
          "password": password,
        }),
      );
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao Cadastrar-se. Tente novamente!"}',
        400,
      );
    }
  }
}
