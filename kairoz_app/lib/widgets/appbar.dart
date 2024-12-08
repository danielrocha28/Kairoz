import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget implements PreferredSizeWidget {
  const MyAppBar({
    super.key,
    required this.title,
    this.iconTheme,
    this.titleFontSize = 26.0,
  });

  final String title;
  final IconThemeData? iconTheme;
  final double titleFontSize;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Row(
        children: [
          Image.asset(
            'assets/kairozlogo.png',
            height: 125,
            width: 125,
          ),
          const SizedBox(width: 5),
        ],
      ),
      backgroundColor: const Color.fromARGB(255, 82, 22, 185),
      iconTheme: iconTheme,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
