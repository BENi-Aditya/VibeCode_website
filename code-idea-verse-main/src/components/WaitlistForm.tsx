import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWaitlist } from './WaitlistContext';

type WaitlistFormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  useCase: string;
  review: string;
};

// Accept isOpen and setIsOpen as props for context control
export function WaitlistForm({ isOpen, setIsOpen }: { isOpen?: boolean, setIsOpen?: (open: boolean) => void }) {
  const { closeWaitlist } = useWaitlist();
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    useCase: '',
    review: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001/api/waitlist' : 'https://vibecode.org.in/api/waitlist';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          useCase: '',
          review: ''
        });
        setTimeout(() => {
          if (setIsOpen) {
            setIsOpen(false);
          } else {
            closeWaitlist();
          }
        }, 3000);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use isOpen/setIsOpen from props if provided (for context), else fallback to local state for backward compatibility
  const [localOpen, localSetOpen] = useState(false);
  const effectiveOpen = typeof isOpen === 'boolean' ? isOpen : localOpen;
  const effectiveSetOpen = setIsOpen || localSetOpen;

  return (
    <Dialog open={effectiveOpen} onOpenChange={effectiveSetOpen}>
      <DialogTrigger asChild>
        <Button className="button-primary pulse-glow">
          Join Waitlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <button 
          onClick={() => effectiveSetOpen(false)} 
          className="absolute right-4 top-4 rounded-full h-8 w-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 z-50"
          aria-label="Close"
        >
          ✕
        </button>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Join VibeCode Waitlist</DialogTitle>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="text-center py-8">
            <p className="text-lg font-medium text-green-600">Thank you for joining our waitlist!</p>
            <p className="mt-2">We're excited to have you on board. We'll be in touch soon with updates about VibeCode.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {error && (
              <div className="text-red-600 dark:text-red-400 p-3 rounded-md text-sm dark:bg-transparent">
                {error}
              </div>
            )}
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="col-span-3 bg-white/70 dark:bg-gray-800/50 dark:text-white/90 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  className="col-span-3 bg-white/70 dark:bg-gray-800/50 dark:text-white/90 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="col-span-3 bg-white/70 dark:bg-gray-800/50 dark:text-white/90 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right">
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="col-span-3 bg-white/70 dark:bg-gray-800/50 dark:text-white/90 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="useCase" className="text-right">
                  Use Case
                </Label>
                <Textarea
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleChange}
                  placeholder="How would you use VibeCode? (Optional)"
                  className="col-span-3 bg-white/70 dark:bg-gray-800/50 dark:text-white/90 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="review" className="text-right">
                  Review
                </Label>
                <Textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Your honest feedback on the VibeCode concept (optional)"
                  className="col-span-3 bg-white/70 dark:bg-gray-800/50 dark:text-white/90 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to join our waitlist and receive updates about VibeCode.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
