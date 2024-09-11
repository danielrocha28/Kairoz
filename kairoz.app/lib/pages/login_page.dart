import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:kairoz/widgets/kairoz_logo.dart';
import 'package:kairoz/widgets/kairoz_outline_input.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  _login(BuildContext context) async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "email": _emailController.text,
          "password": _passwordController.text
        }),
      );

      validateRequestResponse(response, context);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Ocorreu um erro ao entrar. Tente novamente!'),
        ),
      );
    }
  }

  validateRequestResponse(Response response, BuildContext context) {
    if (response.statusCode == 200) {
      return Navigator.pushNamedAndRemoveUntil(
        context,
        '/home',
        ModalRoute.withName('/'),
      );
    }

    Map<String, dynamic> temp = json.decode(response.body);
    String message = temp['error'] ?? 'Ocorreu um erro inesperado';

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  validateEmailField(String? value) {
    if (value == null || value.isEmpty) {
      return 'Campo obrigatório';
    } else if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
      return 'Por favor, insira um email válido';
    }
    return null;
  }

  validatePasswordField(String? value) {
    if (value == null || value.isEmpty) {
      return 'Campo obrigatório';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 82, 22, 185),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: SingleChildScrollView(
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const KairozLogo(),
                  const SizedBox(height: 16),
                  KairozOutlineInput(
                    labelText: 'Email',
                    controller: _emailController,
                    validator: (value) => validateEmailField(value),
                  ),
                  const SizedBox(height: 16),
                  KairozOutlineInput(
                    labelText: 'Senha',
                    obscureText: true,
                    controller: _passwordController,
                    validator: (value) => validatePasswordField(value),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        _login(context);
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size(double.infinity, 48),
                    ),
                    child: const Text('Entrar'),
                  ),
                  Container(
                    height: 40.0,
                    margin: const EdgeInsets.only(top: 20.0),
                    child: Center(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text(
                            'Não possui cadastro?',
                            style: TextStyle(color: Colors.white),
                          ),
                          TextButton(
                            child: const Text(
                              'Criar agora',
                              textAlign: TextAlign.center,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 15,
                              ),
                            ),
                            onPressed: () {
                              Navigator.pushNamedAndRemoveUntil(
                                context,
                                '/register',
                                ModalRoute.withName('/'),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
