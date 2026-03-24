import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SkillBadge } from '@/components/SkillBadge';
import { allSkills } from '@/data/mockData';
import { Skill } from '@/types/project';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { useStats } from '@/context/StatsContext';

const categories = [
  'AI & Machine Learning',
  'Developer Tools',
  'E-Commerce',
  'Education',
  'Finance',
  'Gaming',
  'Health & Wellness',
  'Social',
  'Sustainability',
  'Other',
];

const PostProject = () => {
  const { recordProjectCreated, recordStudentJoined } = useStats();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [teamSize, setTeamSize] = useState('4');
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSkillToggle = (skill: Skill) => {
    setSelectedSkills(prev => {
      const exists = prev.some(s => s.name === skill.name);
      if (exists) {
        return prev.filter(s => s.name !== skill.name);
      }
      if (prev.length >= 6) {
        toast.error('Maximum 6 skills allowed');
        return prev;
      }
      return [...prev, skill];
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would save to the database.
    // For now, we update the shared stats so the homepage numbers react immediately.
    recordProjectCreated();
    recordStudentJoined();
    toast.success('Project posted successfully! (Demo only)', {
      description: 'In a full version, this would save to the database.',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-cta flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Post Your Project</h1>
            <p className="text-muted-foreground">
              Share your idea and find the perfect teammates to bring it to life
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Project Details</CardTitle>
                <CardDescription>Tell us about your project idea</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., EcoTrack - Carbon Footprint App"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project idea, goals, and what makes it unique..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                {/* Category and Team Size */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Team Size</Label>
                    <Select value={teamSize} onValueChange={setTeamSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[2, 3, 4, 5, 6, 7, 8].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size} members
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Skills Needed */}
                <div className="space-y-3">
                  <Label>Skills Needed (select up to 6)</Label>
                  {selectedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-muted/50">
                      {selectedSkills.map((skill) => (
                        <SkillBadge
                          key={skill.name}
                          skill={skill}
                          size="sm"
                          onClick={() => handleSkillToggle(skill)}
                          selected
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 p-4 rounded-lg border border-dashed border-border">
                    {allSkills.map((skill) => (
                      <SkillBadge
                        key={skill.name}
                        skill={skill}
                        size="sm"
                        onClick={() => handleSkillToggle(skill)}
                        selected={selectedSkills.some(s => s.name === skill.name)}
                      />
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags (up to 5)</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-sm"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-full shadow-[0_0_14px_rgba(88,28,135,0.45)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(88,28,135,0.6)] hover:scale-[1.03]"
                    size="lg"
                  >
                    Post Project
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    By posting, you agree to our community guidelines
                  </p>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostProject;
