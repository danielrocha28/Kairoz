import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';

class CustomBottomNavBar extends StatelessWidget {
  final Function(int) onTabChange;
  final int selectedIndex;

  const CustomBottomNavBar({
    super.key,
    required this.onTabChange,
    required this.selectedIndex,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xffE4E1F3),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 15.0),
        child: GNav(
          selectedIndex: selectedIndex,
          color: const Color.fromARGB(255, 82, 22, 185),
          activeColor: const Color.fromARGB(255, 82, 22, 185),
          gap: 8,
          padding: const EdgeInsets.all(16),
          tabBackgroundColor: const Color(0xffCFC9F1),
          onTabChange: (index) {
            onTabChange(index);
          },
          tabs: const [
            GButton(
              icon: Icons.menu_book_sharp,
              text: 'Estudos',
            ),
            GButton(
              icon: Icons.favorite_border,
              text: 'Saúde',
            ),
            GButton(
              icon: Icons.card_travel_outlined,
              text: 'Trabalho',
            ),
            GButton(
              icon: Icons.sports_esports_rounded,
              text: 'Lazer',
            ),
          ],
        ),
      ),
    );
  }
}
