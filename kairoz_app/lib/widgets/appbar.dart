import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget implements PreferredSizeWidget {
  const MyAppBar({
    super.key,
    required this.title,
    this.iconTheme,
  });

  final String title;
  final IconThemeData? iconTheme;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Row(
        children: [
          Image.asset(
            'assets/logo.png',
            height: 28,
            width: 28,
          ),
          const SizedBox(width: 5),
          Text(
            title,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 26,
              fontWeight: FontWeight.normal,
            ),
          ),
        ],
      ),
      backgroundColor: const Color.fromARGB(255, 82, 22, 185),
      iconTheme: iconTheme,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
