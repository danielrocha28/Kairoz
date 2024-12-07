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
            'assets/logo1.png',
            height: 28,
            width: 28,
          ),
          const SizedBox(width: 5),
          Text(
            title,
            style: TextStyle(
              color: Colors.white,
              fontSize: titleFontSize,
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
