import 'package:flutter/material.dart';

class KairozLogo extends StatelessWidget {
  const KairozLogo({super.key});

  @override
  Widget build(BuildContext context) {
    return const Align(
      alignment: Alignment.topCenter,
      child: Padding(
        padding: EdgeInsets.only(top: 80),
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
    );
  }
}
