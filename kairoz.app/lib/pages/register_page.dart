import 'package:flutter/material.dart';

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
        onPressed: () {},
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
                  textFormFieldName(),
                  textFormFieldEmail(),
                  textFormFieldPassword(),
                  textFormFieldRepeatPassword(),
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

  TextFormField textFormFieldEmail() {
    return TextFormField(
      controller: _tedEmail,
      autofocus: true,
      keyboardType: TextInputType.text,
      style: TextStyle(color: Colors.black),
      decoration: InputDecoration(
        labelText: "Email",
        hintText: "Informe o email",
        hintStyle: TextStyle(fontSize: 14),
      ),
    );
  }

  TextFormField textFormFieldName() {
    return TextFormField(
      controller: _tedName,
      autofocus: true,
      keyboardType: TextInputType.text,
      decoration: InputDecoration(
        labelText: "Nome",
        hintText: "Informe seu nome",
        hintStyle: TextStyle(fontSize: 14),
      ),
    );
  }

  TextFormField textFormFieldPassword() {
    return TextFormField(
      controller: _tedPassword,
      autofocus: true,
      obscureText: true,
      keyboardType: TextInputType.text,
      style: TextStyle(color: Colors.black),
      decoration: InputDecoration(
        labelText: "Senha",
        hintText: "Informe a senha",
        hintStyle: TextStyle(fontSize: 14),
      ),
    );
  }

  TextFormField textFormFieldRepeatPassword() {
    return TextFormField(
      controller: _tedRepeatPassword,
      autofocus: true,
      obscureText: true,
      keyboardType: TextInputType.text,
      style: TextStyle(color: Colors.black),
      decoration: InputDecoration(
        labelText: "Confirme a senha",
        hintText: "Senha",
        hintStyle: TextStyle(fontSize: 14),
      ),
    );
  }
}
