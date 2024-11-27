import 'package:flutter/material.dart';

class BannerWidget extends StatelessWidget {
  final String title;
  final String imageUrl;
  final void Function()? onTap;

  const BannerWidget(
      {super.key, required this.title, required this.imageUrl, this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: FractionallySizedBox(
        alignment: Alignment.topLeft,
        widthFactor: 0.50,
        child: Container(
          padding: const EdgeInsets.symmetric(
            vertical: 40,
            horizontal: 20,
          ),
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage(imageUrl),
              fit: BoxFit.cover,
              opacity: 0.5,
            ),
            color: const Color(0xff958DC5),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text(
            title,
            style: const TextStyle(color: Colors.white, fontSize: 25),
          ),
        ),
      ),
    );
  }
}
