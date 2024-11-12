import 'package:flutter/material.dart';

class MyListTile extends StatelessWidget {
  final IconData icon;
  final String text;
  final void Function()? onTap;
  const MyListTile({
    super.key,
    required this.icon,
    required this.text,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.only(left: 10.0),
        child: ListTile(
          leading: Icon(
            icon,
            color: const Color.fromARGB(255, 76, 37, 143),
          ),
          onTap: onTap,
          title: Text(
            text,
            style: const TextStyle(color: Color.fromARGB(255, 76, 37, 143)),
          ),
        ));
  }
}
