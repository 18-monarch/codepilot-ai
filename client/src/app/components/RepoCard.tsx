// Repository card component
import { motion } from 'motion/react';
import { FolderGit2, Star, Clock } from 'lucide-react';
import type { Repository } from '../../types';

interface RepoCardProps {
  repo: Repository;
  onClick?: () => void;
}

export function RepoCard({ repo, onClick }: RepoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-5 cursor-pointer backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-3 rounded-lg">
          <FolderGit2 className="w-6 h-6 text-purple-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="truncate mb-1">{repo.name}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{repo.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              {repo.language}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {repo.stars}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {repo.lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
