import React from 'react';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { PointsActivity as PointsActivityType } from '../../hooks/usePoints';

interface Props {
  activities: PointsActivityType[];
}

const PointsActivity: React.FC<Props> = ({ activities }) => {
  // ... existing component code ...
};

export default PointsActivity;