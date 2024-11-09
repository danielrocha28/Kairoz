import 'package:flutter/material.dart';
import 'package:kairoz/widgets/my_list_tile.dart';

class MyDrawer extends StatelessWidget {
  final void Function()? onProfileTap;
  final void Function()? onSignOut;
  final void Function()? onHomeTap;
  final Color? foregroundColor;

  const MyDrawer({
    super.key,
    required this.onProfileTap,
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
                child: Icon(
                  Icons.person,
                  color: Color.fromARGB(255, 76, 37, 143),
                  size: 64,
                ),
              ),
              //home list tile
              MyListTile(
                icon: Icons.home,
                text: 'H O M E',
                onTap: onHomeTap,
              ),

              //profile list tile
              MyListTile(
                icon: Icons.person,
                text: 'P R O F I L E',
                onTap: onProfileTap,
              ),

              //logout list tile
              Padding(
                padding: const EdgeInsets.only(bottom: 25.0),
                child: MyListTile(
                  icon: Icons.logout,
                  text: 'L O G O U T',
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
