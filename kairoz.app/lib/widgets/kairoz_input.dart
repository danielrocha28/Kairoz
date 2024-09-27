import 'package:flutter/material.dart';

class KairozInput extends StatelessWidget {
  final String title;
  final String hintText;
  final bool obscureText;
  final TextEditingController controller;

  final FormFieldValidator<String>? validator;

  const KairozInput({
    super.key,
    required this.title,
    required this.controller,
    required this.hintText,
    this.validator,
    this.obscureText = false,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      validator: validator,
      autofocus: true,
      obscureText: obscureText,
      keyboardType: TextInputType.text,
      style: TextStyle(color: Colors.black),
      decoration: InputDecoration(
        labelText: title,
        hintText: hintText,
        hintStyle: TextStyle(fontSize: 14),
      ),
    );
  }
}
