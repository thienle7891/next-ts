import React from 'react';
import './header.scss';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { ModeToggle } from '@/components/ModeToggle';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        <div className='flex justify-between w-full items-center'>
          <span>
            <FlutterDashIcon sx={{ fontSize: 40 }} />
          </span>
          <div className='flex gap-2'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
