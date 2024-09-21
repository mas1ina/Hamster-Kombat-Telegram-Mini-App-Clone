import React, { useEffect, useState } from 'react';
import './App.css';
import Hamster from './icons/Hamster';
import binancelogo from './icons/binancelogo.png';
import dollarCoin from './icons/dollarcoin.png';
import Info from './icons/Info';
import Settings from './icons/Settings';
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, hamsterCoin, mainCharacter } from './images';
import Mine from './icons/Mine';
import Friends from './icons/Friends';
import Coins from './icons/Coins';
import telegramLogo from './icons/telegram.png';
import xLogo from './icons/x.png';
import largeCoin from './icons/Large-Coin.png';
import closeIcon from './icons/close.png';
import rewardIcon from './icons/reward.png';
import levelUpImage from './icons/levelup.png';
import energyIcon from './icons/energy.png'; 
import boostIcon from './icons/boost.png'; 
import harp from './icons/harp.png'; 
import pint from './icons/pint.png';
import leprechaun from './icons/leprechaun.png';
import dollarCoinIcon from './icons/dollarcoin.png';
import luckySpinBg from './icons/luckyspinbg3.png';


import day1Icon from './icons/day1.png';
import day2Icon from './icons/day2.png';
import day3Icon from './icons/day3.png';
import day4Icon from './icons/day4.png';
import day5Icon from './icons/day5.png';
import day6Icon from './icons/day6.png';
import day7Icon from './icons/day7.png';
import day8Icon from './icons/day8.png';
import day9Icon from './icons/day9.png';
import day10Icon from './icons/day10.png';
import day11Icon from './icons/day11.png';
import day12Icon from './icons/day12.png';

const levelNames = [
  "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Epic",
  "Legendary", "Master", "GrandMaster", "Lord"
];

const levelMinPoints = [
  0, 5000, 25000, 100000, 1000000, 2000000,
  10000000, 50000000, 100000000, 1000000000
];

const levelBonuses: Record<string, number> = {
  "Silver": 5000,
  "Gold": 20000,
  "Platinum": 30000,
  "Diamond": 40000,
  "Epic": 60000,
  "Legendary": 100000,
  "Master": 500000,
  "GrandMaster": 1000000,
  "Lord": 3000000,
};

const motivationalQuotes = [
  "Opportunities come infrequently. When it rains gold, put out the bucket, not the thimble. — Warren Buffett",
  "Sometimes the biggest wins come from the riskiest bets. — Warren Buffett",
  "If you don’t find a way to make money while you sleep, you will work until you die. — Warren Buffett",
  "You miss 100% of the shots you don’t take. — Mark Zuckerberg",
  "Don’t be afraid to give up the good to go for the great. — John D. Rockefeller",
  "You can’t win if you don’t play. — Steve Ballmer",
  "The only way to win big is to risk big. — Bernard Arnault",
  "Fortune favors the bold. — Virgil",
  "The greatest risk is not taking one. — Elon Musk",
  "Fortune sides with him who dares. — Larry Ellison",
  "It’s not the money, it’s the thrill of the chase! — Scrooge McDuck",
  "There’s nothing like a little bit of gold to clear the mind. — Scrooge McDuck",
  "I love money. I love everything about it. I love to count it, stack it, and admire it. — Scrooge McDuck",
  "Money is something you have to make every day. — Scrooge McDuck"
];

interface Click {
  id: number;
  x: number;
  y: number;
}

const calculateTimeLeft = (targetHour: number): string => {
  const now = new Date();
  const target = new Date(now);
  target.setUTCHours(targetHour, 0, 0, 0);

  if (now.getUTCHours() >= targetHour) {
    target.setUTCDate(target.getUTCDate() + 1);
  }

  const diff = target.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const formatProfitPerHour = (profit: number): string => {
  if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
  if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
  if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
  return `+${profit}`;
};

function LuckySpinModal({ onClose }: { onClose: () => void }) {
  const icons = [harp, pint, leprechaun, boostIcon, dollarCoinIcon];
  const [slot1, setSlot1] = useState(icons[0]);
  const [slot2, setSlot2] = useState(icons[1]);
  const [slot3, setSlot3] = useState(icons[2]);
  const [spinning, setSpinning] = useState(false);

  const spinSlots = () => {
    if (!spinning) {
      setSpinning(true);
      const intervalId = setInterval(() => {
        setSlot1(icons[Math.floor(Math.random() * icons.length)]);
        setSlot2(icons[Math.floor(Math.random() * icons.length)]);
        setSlot3(icons[Math.floor(Math.random() * icons.length)]);
      }, 100);

      setTimeout(() => {
        clearInterval(intervalId);
        setSpinning(false);
      }, 2000);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Close button using close.png */}
        <img src={closeIcon} alt="Close" className="close-button" onClick={onClose} />
        
        {/* Slots Frame Wrapper and Slots */}
        <div className="slots-frame-wrapper">
          <div className="slot-image slot-1">
            <img src={slot1} alt="Slot 1" />
          </div>
          <div className="slot-image slot-2">
            <img src={slot2} alt="Slot 2" />
          </div>
          <div className="slot-image slot-3">
            <img src={slot3} alt="Slot 3" />
          </div>
        </div>
        
        <button className="spin-button" onClick={spinSlots} disabled={spinning}>
          {spinning ? 'Spinning...' : 'Spin'}
        </button>
      </div>
    </div>
  );
}





function App() {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [clicks, setClicks] = useState<Click[]>([]);
  const [isDailyRewardVisible, setDailyRewardVisible] = useState(false);
  const pointsToAdd = 1000;
  const profitPerHour = 10000;

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState<string>("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState<string>("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState<string>("");

  const [isEarnMenuVisible, setEarnMenuVisible] = useState<boolean>(false);
  const [isCheckingTelegramJoin, setIsCheckingTelegramJoin] = useState<boolean>(false);
  const [showFloatingCoins, setShowFloatingCoins] = useState<boolean>(false);
  const [hasJoinedTelegram, setHasJoinedTelegram] = useState<boolean>(false);
  const [hasFollowedX, setHasFollowedX] = useState<boolean>(false);

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [lastCollectedDate, setLastCollectedDate] = useState<Date | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(1);
  const [isRewardReset, setIsRewardReset] = useState<boolean>(false);
  const [isLevelUpVisible, setIsLevelUpVisible] = useState<boolean>(false);
  const [levelUpMessage, setLevelUpMessage] = useState<string>("");
  const [motivationalQuote, setMotivationalQuote] = useState<string>("");
  const [usedQuotes, setUsedQuotes] = useState<string[]>([]);
  
  const [energy, setEnergy] = useState<number>(1000);
  const [maxEnergy, setMaxEnergy] = useState<number>(1000);

  const [isSpinModalVisible, setSpinModalVisible] = useState(false);

  const rewards = [
    { day: 1, amount: '500', isActive: true, isCollected: false, icon: day1Icon },
    { day: 2, amount: '1K', isActive: false, isCollected: false, icon: day2Icon },
    { day: 3, amount: '2.5K', isActive: false, isCollected: false, icon: day3Icon },
    { day: 4, amount: '5K', isActive: false, isCollected: false, icon: day4Icon },
    { day: 5, amount: '15K', isActive: false, isCollected: false, icon: day5Icon },
    { day: 6, amount: '25K', isActive: false, isCollected: false, icon: day6Icon },
    { day: 7, amount: '100K', isActive: false, isCollected: false, icon: day7Icon },
    { day: 8, amount: '500K', isActive: false, isCollected: false, icon: day8Icon },
    { day: 9, amount: '1M', isActive: false, isCollected: false, icon: day9Icon },
    { day: 10, amount: '5M', isActive: false, isCollected: false, icon: day10Icon },
    { day: 11, amount: '10M', isActive: false, isCollected: false, icon: day11Icon },
    { day: 12, amount: '15M', isActive: false, isCollected: false, icon: day12Icon },
  ];

  const getRandomQuote = () => {
    let availableQuotes = motivationalQuotes.filter(quote => !usedQuotes.includes(quote));
    if (availableQuotes.length === 0) {
      availableQuotes = motivationalQuotes;
      setUsedQuotes([]);
    }
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    setUsedQuotes(prev => [...prev, randomQuote]);
    return randomQuote;
  };

  const handleDayClick = (day: number): void => {
    setSelectedDay(day);
    const targetHour = 24 * (day - 1);
    setDailyRewardTimeLeft(calculateTimeLeft(targetHour));
    setTimeout(() => {
      setSelectedDay(null);
    }, 3000);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (energy >= 3) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(1000px) rotateX(${y / 10}deg) rotateY(${x / 10}deg)`;

      setTimeout(() => {
        card.style.transform = '';
      }, 100);

      setPoints(points + pointsToAdd);
      setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
      setEnergy(prevEnergy => prevEnergy - 3); 
    }
  };

  const handleAnimationEnd = (id: number): void => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    const updateCountdowns = (): void => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const energyRegenerationInterval = setInterval(() => {
      setEnergy(prevEnergy => Math.min(prevEnergy + 3, maxEnergy));
    }, 800);

    return () => clearInterval(energyRegenerationInterval);
  }, [maxEnergy]);

  const calculateProgress = (): number => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    return Math.min(((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100, 100);
  };

  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      setPoints(prevPoints => prevPoints + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [profitPerHour]);

  useEffect(() => {
    const checkLevelUp = () => {
      if (levelIndex < levelNames.length - 1 && points >= levelMinPoints[levelIndex + 1]) {
        const newLevel = levelNames[levelIndex + 1];
        const bonus = levelBonuses[newLevel] || 0;

        setPoints(prevPoints => prevPoints + bonus);
        setLevelIndex(prevIndex => prevIndex + 1);

        const newMaxEnergy = 1000 + levelIndex * 500;
        setMaxEnergy(newMaxEnergy);
        setEnergy(newMaxEnergy); 

        const randomMotivationalMessage = getRandomQuote();
        setLevelUpMessage(`You've reached ${newLevel} level! Enjoy a bonus of ${bonus.toLocaleString()} coins.`);
        setMotivationalQuote(randomMotivationalMessage);

        setIsLevelUpVisible(true);
      }
    };

    checkLevelUp();
  }, [points, levelIndex]);

  const toggleEarnMenu = (): void => {
    setEarnMenuVisible(!isEarnMenuVisible);
  };

  const toggleDailyReward = (): void => {
    setDailyRewardVisible(!isDailyRewardVisible);
    if (isRewardReset) {
      setIsRewardReset(false);
    }
  };

  const toggleSpinModal = (): void => {
    setSpinModalVisible(!isSpinModalVisible);
  };

  const handleJoinTelegram = (): void => {
    if (!hasJoinedTelegram) {
      setIsCheckingTelegramJoin(true);
      window.open('https://t.me/Reducate1', '_blank');
    }
  };

  const handleCheckJoin = (): void => {
    setPoints(points + 5000);
    setIsCheckingTelegramJoin(false);
    setHasJoinedTelegram(true);
    setShowFloatingCoins(true);
    setTimeout(() => setShowFloatingCoins(false), 3000);
  };

  const handleFollowX = (): void => {
    if (!hasFollowedX) {
      setPoints(points + 5000);
      setHasFollowedX(true);
      setEarnMenuVisible(false);
    }
  };

  const resetDailyReward = () => {
    setCurrentDayIndex(1);
    setLastCollectedDate(null);
    rewards.forEach(reward => {
      reward.isCollected = false;
      reward.isActive = reward.day === 1;
    });
    setIsRewardReset(true);
  };

  const handleCollectReward = (): void => {
    if (selectedDay !== null) {
      const today = new Date();
      const lastCollected = lastCollectedDate ?? new Date(today.setDate(today.getDate() - 1));

      const timeDifference = today.getTime() - lastCollected.getTime();
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      if (hoursDifference > 24) {
        resetDailyReward();
        alert("You missed a day! The reward cycle has been reset.");
        return;
      }

      if (selectedDay === currentDayIndex && rewards[selectedDay - 1].isActive && !rewards[selectedDay - 1].isCollected) {
        setPoints(points + parseInt(rewards[selectedDay - 1].amount.replace(/[^0-9]/g, '')));
        rewards[selectedDay - 1].isCollected = true;
        if (selectedDay < rewards.length) {
          rewards[selectedDay].isActive = true; 
        }

        setLastCollectedDate(new Date());

        setCurrentDayIndex(currentDayIndex + 1);

        setDailyRewardTimeLeft(calculateTimeLeft(24 * currentDayIndex));
      } else {
        alert("You can't collect this reward yet!");
      }

      setSelectedDay(null);
    }
  };

  const closeLevelUpModal = () => {
    setIsLevelUpVisible(false); 
  };

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
              <Hamster size={24} className="text-[#d4d4d4]" />
            </div>
            <div>
              <p className="text-sm">Maslina (CEO)</p>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4 mt-1">
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-sm">{levelNames[levelIndex]}</p>
                  <p className="text-sm">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div className="progress-gradient h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
              <img src={binancelogo} alt="Exchange" className="w-8 h-8" />
              <div className="flex-1 text-center">
                <p className="text-xs text-[#85827d] font-medium">Profit per hour</p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
                  <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
                  <Info size={20} className="text-[#43433b]" />
                </div>
              </div>
              <Settings className="text-white" />
            </div>
          </div>
        </div>

        <div className="flex-grow mt-4 bg-yellow-500 rounded-t-[48px] relative top-glow z-0">
          <div className={`absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] ${isRewardReset ? 'reward-reset' : ''}`}>
            <div className="px-4 mt-6 flex justify-between gap-2">
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative" onClick={toggleDailyReward}>
                <div className="dot"></div>
                <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily reward</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyRewardTimeLeft}</p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative" onClick={toggleSpinModal}>
                <div className="dot"></div>
                <img src={dailyCipher} alt="Lucky spin" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Lucky spin</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyCipherTimeLeft}</p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily combo</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyComboTimeLeft}</p>
              </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div className="px-4 py-2 flex items-center space-x-2">
                <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
                <p className="text-4xl text-white">{points.toLocaleString()}</p>
              </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div className="w-80 h-80 p-4 rounded-full circle-outer" onClick={handleCardClick}>
                <div className="w-full h-full rounded-full circle-inner">
                  <img src={mainCharacter} alt="Main Character" className="w-full h-full" />
                </div>
              </div>

              <div className="flex justify-around mt-10">
                <div className="flex items-center energy-container">
                  <img src={energyIcon} alt="Energy" className="w-14 h-14" />
                  <p className="text-xl text-white font-bold">{energy} / {maxEnergy}</p>
                </div>
                <div className="flex items-center space-x-2 boost-container">
                  <p className="text-xl text-white font-bold">Boost</p>
                  <img src={boostIcon} alt="Boost" className="w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
        <div className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
          <img src={binanceLogo} alt="Exchange" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Exchange</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <Mine className="w-8 h-8 mx-auto" />
          <p className="mt-1">Mine</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <Friends className="w-8 h-8 mx-auto" />
          <p className="mt-1">Friends</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5" onClick={toggleEarnMenu}>
          <Coins className="w-8 h-8 mx-auto" />
          <p className="mt-1">Earn</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Airdrop</p>
        </div>
      </div>
      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}

      {isEarnMenuVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-end z-50 transition-transform duration-500 ease-out">
          <div className="earn-menu">
            <div className="large-coin">
              <img src={largeCoin} alt="Large Coin" />
            </div>
            <h2 className="text-lg font-serif text-white mb-4">EARN MORE COINS</h2>
            <div className="mt-4 w-full max-w-md">
              <div className="earn-menu-item">
                <div className="flex items-center">
                  <img src={telegramLogo} alt="Telegram" className="w-8 h-8" />
                  <div className="earn-menu-item-text">
                    <p className="text-sm text-white">Join our Telegram Channel</p>
                    <p className="text-xs text-gray-400">+5,000 Coins</p>
                  </div>
                </div>
                <button
                  className={`text-white text-sm ${hasJoinedTelegram ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleJoinTelegram}
                  disabled={hasJoinedTelegram}
                >
                  {hasJoinedTelegram ? 'Joined' : 'Join'}
                </button>
              </div>
              <div className="earn-menu-item">
                <div className="flex items-center">
                  <img src={xLogo} alt="X" className="w-8 h-8" />
                  <div className="earn-menu-item-text">
                    <p className="text-sm text-white">Follow us on X</p>
                    <p className="text-xs text-gray-400">+5,000 Coins</p>
                  </div>
                </div>
                <button
                  className={`text-white text-sm ${hasFollowedX ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleFollowX}
                  disabled={hasFollowedX}
                >
                  {hasFollowedX ? 'Followed' : 'Follow'}
                </button>
              </div>
            </div>
            <button
              className="mt-4 close-button"
              onClick={toggleEarnMenu}
            >
               <img src={closeIcon} alt="Close" />
            </button>
          </div>
        </div>
      )}

      {isCheckingTelegramJoin && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-[#1d2025] p-4 rounded-lg w-5/6 max-w-md text-center">
            <h2 className="text-lg text-white mb-4">Confirm Join</h2>
            <div className="flex flex-col items-center">
              <p className="text-sm text-white mb-4">Please confirm that you have joined the Telegram channel.</p>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-4"
                onClick={handleCheckJoin}
              >
                Verify
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => setIsCheckingTelegramJoin(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showFloatingCoins && (
        <div className="floating-coins">
          {[...Array(10)].map((_, i) => (
            <img
              key={i}
              src={dollarCoin}
              alt="Coin"
              className="floating-coin"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                width: `${25 + Math.random() * 10}px`,
                height: `${25 + Math.random() * 10}px`
              }}
            />
          ))}
        </div>
      )}

      {isDailyRewardVisible && (
        <div className="daily-reward-modal">
          <div className="daily-reward-content">
            <img src={closeIcon} alt="Close" className="close-icon" onClick={toggleDailyReward} />
            <img src={rewardIcon} alt="Reward" className="reward-icon" />
            <h2 className="reward-title font-serif">Daily Reward</h2>
            <p className="reward-description font-serif">
              Collect coins for entering the game every day without skipping. The "Collect" button must be clicked daily, otherwise the day count will start over again.
            </p>
            {isRewardReset && (
              <div className="error-message">
                You missed a day! The reward cycle has been reset.
              </div>
            )}
            <div className="reward-calendar">
              {rewards.map((reward, index) => (
                <div
                  key={reward.day}
                  className={`reward-day ${reward.isActive ? 'active' : ''} ${reward.isCollected ? 'collected' : ''}`}
                  onClick={() => handleDayClick(reward.day)}
                >
                  <img src={reward.icon} alt={`Day ${reward.day}`} className="reward-day-icon" />
                  <p> Day {reward.day}</p>
                  <p>{reward.amount}</p>
                  {selectedDay === reward.day && !reward.isCollected && reward.isActive && (
                    <p className="time-left">
                      Time left: {dailyRewardTimeLeft}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <button className="collect-button" onClick={handleCollectReward}>
              Collect
            </button>
          </div>
        </div>
      )}

      {isLevelUpVisible && (
        <div className="level-up-modal">
          <div className="level-up-content">
            <button className="close-icon" onClick={closeLevelUpModal}>
              <img src={closeIcon} alt="Close" />
            </button>
            <img src={levelUpImage} alt="Level Up" className="level-up-image" />
            <h2>Level Up!</h2>
            <p>{levelUpMessage}</p>
            <hr className="my-4 border-t border-gray-300" />
            <p>{motivationalQuote}</p>
          </div>
        </div>
      )}

      {isSpinModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <LuckySpinModal onClose={toggleSpinModal} />
        </div>
      )}
    </div>
  );
}

export default App;
