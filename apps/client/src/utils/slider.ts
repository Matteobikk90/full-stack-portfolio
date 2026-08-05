import ags1440 from '@/assets/images/work/ags-1440.webp';
import ags480 from '@/assets/images/work/ags-480.webp';
import ags960 from '@/assets/images/work/ags-960.webp';
import blendon1440 from '@/assets/images/work/blendon-1440.webp';
import blendon480 from '@/assets/images/work/blendon-480.webp';
import blendon960 from '@/assets/images/work/blendon-960.webp';
import emissions1440 from '@/assets/images/work/emissions-1440.webp';
import emissions480 from '@/assets/images/work/emissions-480.webp';
import emissions960 from '@/assets/images/work/emissions-960.webp';
import internet1440 from '@/assets/images/work/internet-1440.webp';
import internet480 from '@/assets/images/work/internet-480.webp';
import internet960 from '@/assets/images/work/internet-960.webp';
import mind1440 from '@/assets/images/work/mind-earth-1440.webp';
import mind480 from '@/assets/images/work/mind-earth-480.webp';
import mind960 from '@/assets/images/work/mind-earth-960.webp';
import neura1440 from '@/assets/images/work/neura-nft-1440.webp';
import neura480 from '@/assets/images/work/neura-nft-480.webp';
import neura960 from '@/assets/images/work/neura-nft-960.webp';
import pack1440 from '@/assets/images/work/pack-1440.webp';
import pack480 from '@/assets/images/work/pack-480.webp';
import pack960 from '@/assets/images/work/pack-960.webp';
import portfolio1440 from '@/assets/images/work/portfolio-1440.webp';
import portfolio480 from '@/assets/images/work/portfolio-480.webp';
import portfolio960 from '@/assets/images/work/portfolio-960.webp';
import social1440 from '@/assets/images/work/social-1440.webp';
import social480 from '@/assets/images/work/social-480.webp';
import social960 from '@/assets/images/work/social-960.webp';
import water1440 from '@/assets/images/work/water-1440.webp';
import water480 from '@/assets/images/work/water-480.webp';
import water960 from '@/assets/images/work/water-960.webp';
import youth1440 from '@/assets/images/work/youth-1440.webp';
import youth480 from '@/assets/images/work/youth-480.webp';
import youth960 from '@/assets/images/work/youth-960.webp';

export type WorkImage = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
};

const responsiveImage = (
  small: string,
  medium: string,
  large: string,
  width: number,
  height: number
): WorkImage => ({
  src: medium,
  srcSet: `${small} 480w, ${medium} 960w, ${large} 1440w`,
  width,
  height,
});

export const imageMap: Record<string, WorkImage> = {
  'blendon-barber-shop': responsiveImage(
    blendon480,
    blendon960,
    blendon1440,
    3316,
    1674
  ),
  'full-stack-portfolio': responsiveImage(
    portfolio480,
    portfolio960,
    portfolio1440,
    3162,
    1600
  ),
  'file-upload': responsiveImage(pack480, pack960, pack1440, 3254, 1646),
  'ags-illuminazione': responsiveImage(ags480, ags960, ags1440, 3320, 1674),
  'world-emissions-clock': responsiveImage(
    emissions480,
    emissions960,
    emissions1440,
    3324,
    1676
  ),
  'internet-poverty-index': responsiveImage(
    internet480,
    internet960,
    internet1440,
    3326,
    1676
  ),
  'africa-youth-clock': responsiveImage(
    youth480,
    youth960,
    youth1440,
    3162,
    1600
  ),
  'africa-social-protection': responsiveImage(
    social480,
    social960,
    social1440,
    3168,
    1600
  ),
  'water-crisis-clock': responsiveImage(
    water480,
    water960,
    water1440,
    3167,
    1600
  ),
  'mind-earth': responsiveImage(
    mind480,
    mind960,
    mind1440,
    1560,
    820
  ),
  'neura-nft': responsiveImage(
    neura480,
    neura960,
    neura1440,
    1600,
    800
  ),
};
