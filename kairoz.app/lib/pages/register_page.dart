import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:kairoz/services/register.service.dart';
import 'package:kairoz/widgets/kairoz_input.dart';
import 'package:kairoz/widgets/kairoz_logo.dart';

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

  createUser(BuildContext context) async {
    final registerService = RegisterService(
      name: _tedName.text,
      email: _tedEmail.text,
      password: _tedPassword.text,
    );
    final response = await registerService.execute();

    if (response.statusCode == 201) {
      return Navigator.pushNamedAndRemoveUntil(
          context, '/home', ModalRoute.withName('/'));
    }

    Map<String, dynamic> temp = json.decode(response.body);
    String message = temp['error'];

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  validateField(String? value) {
    if (value == null || value.isEmpty) {
      return 'Campo obrigatório';
    }
    return null;
  }

  validatePassword(String? value, String? compareValue) {
    if (value == null || value.isEmpty) {
      return 'Campo obrigatório';
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
          const KairozLogo(),
          form(context),
        ],
      ),
    );
  }

  Container containerButtonRegister(BuildContext context) {
    return Container(
      height: 40.0,
      margin: const EdgeInsets.only(top: 40.0),
      child: ElevatedButton(
        style: ButtonStyle(
          backgroundColor: WidgetStateProperty.all(
            const Color.fromARGB(255, 82, 22, 185),
          ),
        ),
        child: const Text(
          "Cadastre-se",
          style: TextStyle(color: Colors.white),
        ),
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
        children: <Widget>[
          Expanded(
            child: TextButton(
              child: const Text(
                'Ja possui cadastro?',
                textAlign: TextAlign.center,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  color: Colors.grey,
                  fontSize: 15,
                ),
              ),
              onPressed: () {
                Navigator.pushNamedAndRemoveUntil(
                    context, '/login', ModalRoute.withName('/'));
              },
            ),
          ),
          Expanded(
            child: TextButton(
              child: const Text(
                "Entrar",
                style: TextStyle(
                  color: Color.fromARGB(255, 82, 22, 185),
                  fontSize: 15,
                ),
              ),
              onPressed: () {
                Navigator.pushNamed(context, '/home');
              },
            ),
          ),
        ],
      ),
    );
  }

  form(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    return Align(
      alignment: Alignment.bottomCenter,
      child: Container(
        height: heightScreen * 0.74,
        decoration: const BoxDecoration(
          color: Colors.white,
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
                  KairozInput(
                    title: "Nome",
                    controller: _tedName,
                    hintText: "Informe seu nome",
                    validator: (value) => validateField(value),
                  ),
                  KairozInput(
                    title: "E-mail",
                    controller: _tedEmail,
                    hintText: "Informe o email",
                    validator: (value) => validateField(value),
                  ),
                  KairozInput(
                    title: "Senha",
                    controller: _tedPassword,
                    obscureText: true,
                    hintText: "Informe a senha",
                    validator: (value) =>
                        validatePassword(value, _tedRepeatPassword.text),
                  ),
                  KairozInput(
                    title: "Confirmar senha",
                    hintText: "Confirme a senha",
                    controller: _tedRepeatPassword,
                    obscureText: true,
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
