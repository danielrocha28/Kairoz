import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:kairoz/widgets/kairoz_input.dart';

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
    try {
      final url = Uri.https('api-url', 'register');

      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "name": _tedName.text,
          "email": _tedEmail.text,
          "password": _tedPassword.text
        }),
      );

      if (response.statusCode == 201) {
        Navigator.pushNamed(context, '/home');
      }

      if (response.statusCode == 400) {
        Map<String, dynamic> temp = json.decode(response.body);
        String message = temp['error'];

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(message)),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Ocorreu um erro ao criar usuário. Tente novamente!'),
        ),
      );
    } finally {
      print('finalizou aqui');
    }
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
      body: Stack(children: [
        Container(
          child: Align(
            alignment: Alignment.topCenter,
            child: Padding(
              padding: EdgeInsets.only(top: 90),
              child: Text(
                'Kairoz',
                textAlign: TextAlign.center,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 45,
                ),
              ),
            ),
          ),
        ),
        form(context)
      ]),
    );
  }

  Container containerButtonRegister(BuildContext context) {
    return Container(
      height: 40.0,
      margin: EdgeInsets.only(top: 40.0),
      child: ElevatedButton(
        style: ButtonStyle(
          backgroundColor: WidgetStateProperty.all(
            const Color.fromARGB(255, 82, 22, 185),
          ),
        ),
        child: Text(
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
      margin: EdgeInsets.only(top: 20.0),
      child: Row(
        children: <Widget>[
          Expanded(
            child: Text(
              'Ja possui cadastro?',
              textAlign: TextAlign.center,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: Colors.grey,
                fontSize: 15,
              ),
            ),
          ),
          Expanded(
            child: TextButton(
              child: Text(
                "Entrar",
                style: TextStyle(
                  color: const Color.fromARGB(255, 82, 22, 185),
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
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: new BorderRadius.only(
            topLeft: const Radius.circular(40.0),
            topRight: const Radius.circular(40.0),
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
