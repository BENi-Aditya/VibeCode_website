import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
      const response = await fetch('http://localhost:3001/api/waitlist', {
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
        setTimeout(() => setIsOpen && setIsOpen(false), 3000);
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
      <DialogContent className="sm:max-w-[500px]">
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
            
            <div>
              <Label htmlFor="name">Full Name*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="text-gray-900 dark:text-white"
                placeholder=""
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="text-gray-900 dark:text-white"
                placeholder=""
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="text-gray-900 dark:text-white"
                placeholder=""
              />
            </div>
            
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="text-gray-900 dark:text-white"
                placeholder=""
              />
            </div>
            
            <div>
              <Label htmlFor="useCase">How do you plan to use VibeCode?*</Label>
              <Textarea
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleChange}
                rows={3}
                required
                placeholder="Describe your coding needs, projects you want to build, or problems you're looking to solve."
              />
            </div>
            
            <div>
              <Label htmlFor="review">
                Your honest feedback on the VibeCode concept (optional)
              </Label>
              <Textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChange}
                rows={3}
                placeholder="Share your thoughts on the VibeCode concept. What excites you? What concerns do you have?"
              />
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
