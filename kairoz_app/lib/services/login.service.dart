import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class LoginService {
  final String email;
  final String password;

  const LoginService({
    required this.email,
    required this.password,
  });

  Future<http.Response> execute() async {
    final baseUrl = dotenv.env['BASE_URL'];
    final mockedMode = dotenv.env['MOCKED_MODE'];

    if (mockedMode == 'true') {
      return http.Response('Usuário logado', 200);
    }

    try {
      return await http.post(
        Uri.parse('$baseUrl/login'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"email": email, "password": password}),
      );
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao entrar. Tente novamente!"}',
        400,
      );
    }
  }
}
