import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:kairoz/services/register.service.dart';
import 'package:kairoz/widgets/kairoz_outline_input.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _tedName = TextEditingController();
  final _tedEmail = TextEditingController();
  final _tedPassword = TextEditingController();
  final _tedRepeatPassword = TextEditingController();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  bool _obscurePassword = true;
  bool _obscureRepeatPassword = true;

  @override
  void dispose() {
    _tedName.dispose();
    _tedEmail.dispose();
    _tedPassword.dispose();
    _tedRepeatPassword.dispose();
    super.dispose();
  }

  Future<void> createUser(BuildContext context) async {
    final registerService = RegisterService(
      name: _tedName.text,
      email: _tedEmail.text,
      password: _tedPassword.text,
    );
    final response = await registerService.execute();

    if (response.statusCode == 201) {
      Map<String, dynamic> temp = json.decode(response.body);
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', temp['token']);

      Navigator.pushNamedAndRemoveUntil(context, '/home', (route) => false);
    } else {
      Map<String, dynamic> temp = json.decode(response.body);
      String message = temp['error'];

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(message)),
      );
    }
  }

  String? emailValidateField(String? value) {
    if (value == null || value.isEmpty) {
      return 'Campo obrigatório';
    } else if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
      return 'Por favor, insira um email válido';
    }
    return null;
  }

  String? validateField(String? value) {
    if (value == null || value.isEmpty) {
      return 'Campo obrigatório';
    }

    if (!RegExp(r'^(?!^\d+$)^.+$').hasMatch(value)) {
      return 'O nome não pode possuir apenas números';
    }
    return null;
  }

  String? validatePassword(String? value, String? compareValue) {
    if (value == null || value.isEmpty) {
      return 'Campo obrigatório';
    }

    RegExp regExp = RegExp(r'[!@#$%^&*(),.?":{}|<>]');
    final isValidPassword = regExp.hasMatch(value);

    if (!isValidPassword) {
      return 'A senha é muito fraca, use: (ex: "@, %, #" )';
    }

    if (value.length < 6) {
      return 'A senha deve ter pelo menos 6 dígitos';
    }

    if (value != compareValue) {
      return 'As senhas não são correspondentes';
    }

    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 82, 22, 185),
      body: Stack(
        children: [
          Align(
            alignment: Alignment.topCenter,
            child: Padding(
              padding: const EdgeInsets.only(top: 80.0),
              child: Image.asset(
                'assets/kairozlogo.png',
                height: 90,
                width: 225,
              ),
            ),
          ),
          form(context),
        ],
      ),
    );
  }

  Container containerButtonRegister(BuildContext context) {
    return Container(
      height: 40.0,
      margin: const EdgeInsets.only(top: 50.0),
      child: ElevatedButton(
        style: ButtonStyle(
          backgroundColor: WidgetStateProperty.all(
            const Color.fromARGB(255, 255, 255, 255),
          ),
        ),
        child: const Text("Cadastre-se"),
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            createUser(context);
          }
        },
      ),
    );
  }

  Container containerRegister(BuildContext context) {
    return Container(
      height: 40.0,
      margin: const EdgeInsets.only(top: 20.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Já possui cadastro?',
            style: TextStyle(color: Colors.white),
          ),
          const SizedBox(width: 8),
          TextButton(
            child: const Text(
              "Entrar",
              style: TextStyle(
                color: Color.fromARGB(255, 255, 255, 255),
                fontSize: 15,
              ),
            ),
            onPressed: () {
              Navigator.pushNamed(context, '/login');
            },
          ),
        ],
      ),
    );
  }

  Widget form(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    return Align(
      alignment: Alignment.bottomCenter,
      child: Container(
        height: heightScreen * 0.81,
        decoration: const BoxDecoration(
          color: Color.fromARGB(255, 82, 22, 185),
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(40.0),
            topRight: Radius.circular(40.0),
          ),
        ),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.only(
                right: 15,
                left: 15,
                top: 70,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  const SizedBox(height: 16),
                  KairozOutlineInput(
                    controller: _tedName,
                    labelText: "Nome",
                    validator: (value) => validateField(value),
                  ),
                  const SizedBox(height: 16),
                  KairozOutlineInput(
                    controller: _tedEmail,
                    labelText: "E-mail",
                    validator: (value) => emailValidateField(value),
                  ),
                  const SizedBox(height: 16),
                  KairozOutlineInput(
                    controller: _tedPassword,
                    suffixIcon: _tedPassword.text.isNotEmpty
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
                    validator: (value) =>
                        validatePassword(value, _tedRepeatPassword.text),
                  ),
                  const SizedBox(height: 16),
                  KairozOutlineInput(
                    controller: _tedRepeatPassword,
                    suffixIcon: _tedRepeatPassword.text.isNotEmpty
                        ? IconButton(
                            icon: Icon(
                              _obscureRepeatPassword
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: Colors.white,
                            ),
                            onPressed: () {
                              setState(() {
                                _obscureRepeatPassword =
                                    !_obscureRepeatPassword;
                              });
                            },
                          )
                        : null,
                    obscureText: _obscureRepeatPassword,
                    labelText: "Confirme a senha",
                    validator: (value) =>
                        validatePassword(value, _tedPassword.text),
                  ),
                  containerButtonRegister(context),
                  containerRegister(context),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
