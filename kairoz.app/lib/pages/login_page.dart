import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:kairoz/services/login.service.dart';
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
    final loginService = LoginService(
      email: _emailController.text,
      password: _passwordController.text,
    );

    final response = await loginService.execute();

    if (response.statusCode == 200) {
      return Navigator.pushNamedAndRemoveUntil(
          context, '/home', ModalRoute.withName('/'));
    }

    Map<String, dynamic> temp = json.decode(response.body);
    String message =
        temp['error'] ?? 'Ocorreu um erro ao entrar. Tente novamente!';

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  validateEmailField(String? value) {
    if (value == null || value.isEmpty) {
      return 'Campo obrigatório';
    } else if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
      return 'Email inválido';
    }
    return null;
  }

  validatePasswordField(String? value) {
    if (value == null || value.isEmpty) {
      return 'Campo obrigatório';
    }
    if (value.length < 6) {
      return 'Senha inválida';
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
                  const Positioned(
                    top: 20, // Distância do topo
                    left: 20, // Distância da esquerda
                    child: KairozLogo(),
                  ),
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
