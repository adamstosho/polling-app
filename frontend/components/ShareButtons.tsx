'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Share2, Copy, QrCode, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

interface ShareButtonsProps {
  pollId: string;
  question: string;
}

export default function ShareButtons({ pollId, question }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  
  const pollUrl = `${window.location.origin}/polls/${pollId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pollUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vote on this poll',
          text: question,
          url: pollUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={shareNative} variant="outline" size="sm">
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      
      <Button onClick={copyToClipboard} variant="outline" size="sm">
        <motion.div
          initial={false}
          animate={{ rotate: copied ? 360 : 0 }}
        >
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
        </motion.div>
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <QrCode className="w-4 h-4 mr-2" />
            QR Code
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share via QR Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <QRCodeSVG 
                value={pollUrl} 
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="space-y-2">
              <Label>Poll Link</Label>
              <div className="flex items-center space-x-2">
                <Input value={pollUrl} readOnly />
                <Button onClick={copyToClipboard} size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}