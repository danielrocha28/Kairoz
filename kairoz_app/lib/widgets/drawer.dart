import 'package:flutter/material.dart';
import 'package:kairoz/widgets/my_list_tile.dart';

class MyDrawer extends StatelessWidget {
  final void Function()? onProfileTap;
  final void Function()? onCalendarTap;
  final void Function()? onSignOut;
  final void Function()? onHomeTap;
  final Color? foregroundColor;

  const MyDrawer({
    super.key,
    required this.onProfileTap,
    required this.onCalendarTap,
    required this.onSignOut,
    required this.onHomeTap,
    this.foregroundColor,
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: const Color(0xffE4E1F3),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            children: [
              const DrawerHeader(
                child: Image(
                  image: AssetImage('assets/kairozlogo1.png'),
                  width: 200,
                  fit: BoxFit.contain,
                ),
              ),
              MyListTile(
                icon: Icons.home,
                text: 'H O M E',
                onTap: onHomeTap,
              ),
              MyListTile(
                icon: Icons.person,
                text: 'P E R F I L',
                onTap: onProfileTap,
              ),
              MyListTile(
                icon: Icons.calendar_month_outlined,
                text: ' A G E N D A',
                onTap: onCalendarTap,
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 25.0),
                child: MyListTile(
                  icon: Icons.logout,
                  text: 'S A I R',
                  onTap: onSignOut,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
