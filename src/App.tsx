// App.tsx
import { useEffect, useState } from 'react';
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
import largeCoin from './icons/Large-Coin.png'; // Make sure to add your large coin image here

const levelNames = [
  "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Epic",
  "Legendary", "Master", "GrandMaster", "Lord"
];

const levelMinPoints = [
  0, 5000, 25000, 100000, 1000000, 2000000,
  10000000, 50000000, 100000000, 1000000000
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
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const formatProfitPerHour = (profit: number): string => {
  if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
  if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
  if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
  return `+${profit}`;
};

function App() {
  const [levelIndex] = useState<number>(6);
  const [points, setPoints] = useState<number>(0);
  const [clicks, setClicks] = useState<Click[]>([]);
  const pointsToAdd = 11;
  const profitPerHour = 126420;

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState<string>("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState<string>("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState<string>("");

  const [isEarnMenuVisible, setEarnMenuVisible] = useState<boolean>(false);
  const [isCheckingTelegramJoin, setIsCheckingTelegramJoin] = useState<boolean>(false);
  const [showFloatingCoins, setShowFloatingCoins] = useState<boolean>(false);
  const [hasJoinedTelegram, setHasJoinedTelegram] = useState<boolean>(false);
  const [hasFollowedX, setHasFollowedX] = useState<boolean>(false);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>): void => {
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

  const toggleEarnMenu = (): void => {
    setEarnMenuVisible(!isEarnMenuVisible);
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
    setTimeout(() => setShowFloatingCoins(false), 3000); // Hide coins after 3 seconds
  };

  const handleFollowX = (): void => {
    if (!hasFollowedX) {
      setPoints(points + 5000);
      setHasFollowedX(true);
      setEarnMenuVisible(false);
    }
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
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
            <div className="px-4 mt-6 flex justify-between gap-2">
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily reward</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyRewardTimeLeft}</p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily cipher</p>
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
                    <p className="text-xs text-gray-400">+5,000 oins</p>
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
              Close
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
    </div>
  );
}

export default App;
