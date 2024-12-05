import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:kairoz/services/login.service.dart';
import 'package:kairoz/widgets/kairoz_outline_input.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  LoginPageState createState() => LoginPageState();
}

class LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  bool _obscurePassword = true;

  _login(BuildContext context) async {
    final loginService = LoginService(
      email: _emailController.text,
      password: _passwordController.text,
    );

    final response = await loginService.execute();

    if (response.statusCode == 200) {
      Map<String, dynamic> temp = json.decode(response.body);

      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', temp['token']);

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
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image.asset(
                        'assets/logo.png',
                        height: 50,
                        width: 50,
                      ),
                      const SizedBox(width: 2),
                      const Text(
                        'Kairoz',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 45,
                          fontWeight: FontWeight.normal,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  KairozOutlineInput(
                    labelText: 'Email',
                    controller: _emailController,
                    validator: (value) => validateEmailField(value),
                  ),
                  const SizedBox(height: 16),
                  KairozOutlineInput(
                    controller: _passwordController,
                    suffixIcon: _passwordController.text.isNotEmpty
                        ? IconButton(
                            icon: Icon(
                              _obscurePassword
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: Colors.white,
                            ),
                            onPressed: () {
                              setState(() {
                                _obscurePassword = !_obscurePassword;
                              });
                            },
                          )
                        : null,
                    obscureText: _obscurePassword,
                    labelText: "Senha",
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
